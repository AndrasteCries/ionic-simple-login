import {onMounted, ref, watch} from 'vue';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Preferences} from '@capacitor/preferences';
import {isPlatform} from '@ionic/vue';
import {Capacitor} from '@capacitor/core';

const photos = ref<UserPhoto[]>([]);
const lastImage = ref<UserPhoto>({
                  filepath: "http://www.gravatar.com/avatar?d=mm&s=140",
                  webviewPath: "http://www.gravatar.com/avatar?d=mm&s=140" });

const PHOTO_STORAGE = 'photos';
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}
export const usePhotoGallery = () => {
    const takePhoto = async (source: boolean) => {
        if(isPlatform('hybrid')){
            await Camera.requestPermissions({permissions: ['photos']})
        }
        try {
            const camSource = source ? CameraSource.Photos : CameraSource.Camera;
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: camSource,
                quality: 100,
            });
            if (photo) {
                const fileName = Date.now() + '.jpeg';
                const savedFileImage = await savePicture(photo, fileName);
                lastImage.value = savedFileImage;
                photos.value = [savedFileImage, ...photos.value];
            }
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    return {
        photos,
        lastImage,
        takePhoto,
    };
};

const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string | Blob;
    // "hybrid" will detect mobile - iOS or Android
    if (isPlatform('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path!,
        });
        base64Data = file.data;
    } else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        base64Data = (await convertBlobToBase64(blob)) as string;
    }
    const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {
        // Display the new image by rewriting the 'file://' path to HTTP
        return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
    } else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
    }
};

const cachePhotos = () => {
    Preferences.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(photos.value),
    });
};

watch(photos, cachePhotos);

const loadSaved = async () => {
    const photoList = await Preferences.get({ key: PHOTO_STORAGE });
    const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

    // If running on the web...
    if (!isPlatform('hybrid')) {
        for (const photo of photosInPreferences) {
            const file = await Filesystem.readFile({
                path: photo.filepath,
                directory: Directory.Data,
            });
            // Web platform only: Load the photo as base64 data
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
    }

    photos.value = photosInPreferences;
};

onMounted(loadSaved);