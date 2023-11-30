'use strict';

import { onEvent, select, create, print } from './utils.js';
import Subscriber from './Subscriber.js';

const profilePicture = select('.profile-picture');
const accountInfo = select('.account-info');
const textArea = select('#text');
const inputFile = select('#file');
const fileName = select('#file-name');
const postBtn = select('#post-btn');
const posts = select('.posts');
const body = select('body');
let file = null;
let isFileSelected = false;
let userDisplayName = '';

const groupsArray = ['Fantasy novel fans', 'Manga', 'Anime fans'];
const pagesArray = ['Web Developers', 'Winnipeg Newcomers', 'Book Lovers'];

const currentUser = new Subscriber('01235', 'Wellington Suero', 'WellSR', 'wellsr@gmail.com', pagesArray, groupsArray, true);
userDisplayName = currentUser.name;

// print(currentUser);
// print(userDisplayName);
// print(currentUser.getInfo());

onEvent(profilePicture, 'click', displayAccountInfo);

// Display the user account info when the profile picture is clicked
function displayAccountInfo() {
  accountInfo.innerHTML = '';
  let accountInfoText = create('p');
  accountInfoText.textContent = currentUser.getInfo();
  accountInfo.appendChild(accountInfoText);
  accountInfo.classList.toggle('hidden');
}

// Clear the text area and file input
function clearInputs() {
  textArea.value = '';
  fileName.innerHTML = '';
  isFileSelected = false;
}

// Get the current date
function getDate() {
  const parameters = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return new Date().toLocaleDateString('en-ca', parameters);
}

onEvent(inputFile, 'change', displayFileName);

// Display the file name when a file is selected
function displayFileName() {
  file = inputFile.files[0];
  fileName.textContent = file.name;
  isFileSelected = true;
}

onEvent(postBtn, 'click', newPost);

// Create a new post when the post button is clicked
function newPost() {
// Validate the text area and file input before creating a new post
  if (textArea.value.trim() !== '' || isFileSelected) {
    if (isFileSelected) {
      const post = create('div');
      const postImg = create('img');
      postImg.src = URL.createObjectURL(file);
      post.innerHTML = `
        <div class="new-post">
          <div class="post-header flex">
              <div class="flex">
                  <img src="./assets/img/profile-picture.jpg" alt="profile picture" width="45">
                  <h4>${userDisplayName}</h4>
              </div>
              <div>
                  <p>${getDate()}</p>
              </div>
          </div>
          <div class="post-content">
              <div class="post-content-text">
                  <p>${textArea.value.trim()}</p>
              </div>
              <div class="post-content-img">
                  <img src="${postImg.src}" width="100%" class="post-image">
              </div>
          </div>
        </div>
      `;
      posts.prepend(post);
      clearInputs();
      
    } else {
      const post = create('div');
      post.innerHTML = `
        <div class="new-post">
          <div class="post-header flex">
              <div class="flex">
                  <img src="./assets/img/profile-picture.jpg" alt="profile picture" width="45">
                  <h4>${userDisplayName}</h4>
              </div>
              <div>
                  <p>${getDate()}</p>
              </div>
          </div>
          <div class="post-content">
              <div class="post-content-text">
                  <p>${textArea.value.trim()}</p> 
              </div>
          </div>
        </div>
      `;
      posts.prepend(post);
      clearInputs();
      
      // print(post);
    }
  } else {
    textArea.focus();
  }
}

onEvent(body, 'click', hideAccountInfo);

// Hide the account info when the user clicks outside the account info box
function hideAccountInfo(event) {
  if (event.target !== profilePicture) {
    accountInfo.classList.add('hidden');
  }
}
