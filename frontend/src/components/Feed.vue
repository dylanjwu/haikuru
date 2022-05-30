<template>
  <div class="feed">
    <h3> Haikua feed</h3>
    <ul>
      <li v-for="haiku in haikus" :key="haiku.text">
      <div class="post post-1">
        <p class="post-text">{{haiku.text}}</p>
        <button class="btn like-btn" v-on:click="likeHaiku">Like</button>
        <button class="btn dislike-btn" v-on:click="dislikeHaiku">Dislike</button>
        <p>Likes: {{ haiku.likes }} Dislikes: {{ haiku.dislikes }}</p>
      </div>
      </li>
      
      <li v-if="formShowing">
        <div class="post post-4">
          <textarea class="post-text" name="" placeholder="Enter haiku here" v-model="newText"></textarea>
          <button class="submit-btn" v-on:click="closeForm()">Submit</button>
        </div>
      </li>
    </ul>

    <button type="button" class="post-btn" v-on:click="showForm()">Post</button>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  props: {
    msg: String
  },
  data: function() {
    return {
      newText: "",
      formShowing: false,
      haikus: [],
    }
  },
  methods: {
    showForm() {
      this.formShowing = true
    },
    closeForm() {
      this.formShowing = false
      this.haikus.push(
        {
          text: this.newText, 
          likes: 0, 
          dislikes: 0, 
          liked: false,
          disliked: false,
        })
      this.newText = ""
    },
    likeHaiku(event) {
      console.log(event.target) 
      return 1
      // if (haiku.liked === true) 
      //   return
      // haiku.liked = true
      // if (haiku.disliked == true) {
      //   haiku.dislikes--;
      //   haiku.disliked = false
      // }

    },
    dislikeHaiku(event) {
      console.log(event.target) 
      return 0
      // if (haiku.disliked === true) 
      //   return
      // haiku.disliked = true
      // if (haiku.disliked == true) {
      //   haiku.dislikes--;
      //   haiku.disliked = false
      // }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  display: list-item;
  padding: 0;
}
li {
  display: list-item;
  /* margin: 0 10px; */
}

.post-btn {
  position: relative;
  bottom: 10px;
  right: 10px;
}
.post {
  padding: 5% 5% 5% 5%;
  margin: 10px 5% 10px 5%;
  border: 1px solid black;
}
.post-text {
  border: 1px solid black; 
  padding: 5% 5% 5% 5%;
  word-wrap: break-word;
  text-align: left;
  text-indent: 30px;
}
a {
  color: #42b983;
}
</style>
