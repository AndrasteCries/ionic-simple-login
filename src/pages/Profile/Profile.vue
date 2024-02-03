<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import * as ionIcons from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonMenuButton,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
  IonFabButton,
  IonActionSheet,
} from '@ionic/vue';
import {logIn} from "ionicons/icons";

const { photos, lastImage, takePhoto } = usePhotoGallery();

const store = useStore();
const editMode = ref(false);

const userInfo = computed(() => store.getters['user/getUser']);

const avatarPath = computed(() => userInfo.value.avatarAddress);
const nickname = computed(() => userInfo.value.username);
const email = computed(() => userInfo.value.email);
const description = computed(() => userInfo.value.description);

const editedAvatar = ref(avatarPath.value);
const editedNickname = ref(nickname.value);
const editedEmail = ref(email.value);
const editedDescription = ref(description.value);

const actionSheetButtons = [
  {
    text: 'Gallery',
    handler: () => cameraPhoto(true),
  },
  {
    text: 'Camera',
    handler: () => cameraPhoto(false),
  },
  {
    text: 'Cancel',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  }];

function handleEditMode(){
  editMode.value = !editMode.value;
}

function saveHandle() {
  console.log(userInfo.value)
  store.dispatch('user/updateUser',
      {
        username: editedNickname.value,
        email: editedEmail.value,
        description: editedDescription.value,
        avatarAddress: editedAvatar.value
      });
  editMode.value = false;
  console.log(userInfo.value)
}
// 0 - camera 1 - gallery
function cameraPhoto(mode: boolean){
  takePhoto(mode).then(() => {
    editedAvatar.value = lastImage.value?.webviewPath;
    console.log(editedAvatar.value);
  });
}

</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :translucent="true">
      <form  v-if="editMode" novalidate @submit.prevent="saveHandle">
        <div class="profile-div">
          <img :src="editedAvatar" alt="edited-avatar" />
          <ion-fab-button id="photo-btn">
            <ion-icon :icon="ionIcons.camera"></ion-icon>
          </ion-fab-button>
          <ion-action-sheet trigger="photo-btn" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
          <ion-item>
            <ion-input  label="Nickname" v-model="editedNickname"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input  label="Email" v-model="editedEmail"></ion-input>
          </ion-item>
          <div id="dscrp-wrapper">
            <h3>About me</h3>
            <div id="dscrp">
              <ion-textarea :auto-grow="true" id="text-area" v-model="editedDescription" aria-label="Comments" label-placement="floating" :counter="true" maxlength="200"></ion-textarea>
            </div>
          </div>
          <ion-list inset lines="none" id="btns">
            <ion-item>
              <ion-button @click="handleEditMode" color="light" expand="block">
                Cancel
              </ion-button>
            </ion-item>
            <ion-item>
              <ion-button type="submit" color="light" expand="block">
                Save
              </ion-button>
            </ion-item>
          </ion-list>
        </div>

      </form>

      <div v-if="!editMode">
        <div class="profile-div">
          <img :src="avatarPath" alt="avatar" />
          <h2>{{nickname}}</h2>
          <p>email: {{email}} </p>
          <div id="dscrp-wrapper">
            <h3>About me</h3>
            <div id="dscrp">
              <p>{{description}}</p>
            </div>
          </div>
          <ion-list inset lines="none" id="btns">
            <ion-item>
              <ion-button
                @click="handleEditMode"
                color="light"
                expand="block">
                Edit profile
              </ion-button>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.profile-div{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
img {
  max-width: 140px;
  border-radius: 50%;
}

#dscrp-wrapper{
  text-align: center;
  width: 80%
}

#dscrp{
  height: 200px;
  border: 2px solid black;
  border-radius: 20px;
  padding: 15px;
  text-align: justify;
  overflow: auto;
}

#btns{
  display: flex;
}

#text-area{
  height: 95%;
}

p{
  margin: 0;
}

#photo-btn{
  --box-shadow: none;
}

</style>
