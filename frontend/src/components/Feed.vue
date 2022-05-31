<template>
  <div class="feed">
    <h3> Haikua feed</h3>
    <ul>
      <li v-for="(haiku, index) in haikus" :key="haiku.text">
      <div class="post post-1">
        <p class="post-text">{{haiku.text}}</p>
        <button class="btn like-btn" v-on:click="likeHaiku(index)">Like</button>
        <button class="btn dislike-btn" v-on:click="dislikeHaiku(index)">Dislike</button>
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
  mounted() {
    this.populateList()
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
       fetch('http://localhost:3000/create-haiku', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.newText,
            likes: 0,
            dislikes: 0,
            user_id: 1, //temp.
          })
      }).then(resp => resp)
      .then(data => console.log(data.status === 200))
      .catch(err => console.error(err));
      // this.haikus.push(
      //   {
      //     text: this.newText, 
      //     likes: 0, 
      //     dislikes: 0, 
      //     liked: false,
      //     disliked: false,
      //   })
      this.newText = ""
      this.populateList()
    },
    likeHaiku(index) {
      const haiku = this.haikus[index]

      if (!haiku.liked){
        haiku.liked = true
        haiku.likes++;

        if (haiku.disliked){
          haiku.dislikes--
          haiku.disliked = false
        }
      }
    },
    dislikeHaiku(index) {
      const haiku = this.haikus[index]

      if (!haiku.disliked){
        haiku.disliked = true
        haiku.dislikes++;

        if (haiku.liked){
          haiku.likes--
          haiku.liked = false
        }
      }
  },
  populateList() {
    fetch('http://localhost:3000/get-haikus', {
      headers: 
        {
          'Content-Type': 'application/json'
        }
      }) 
    .then(resp => resp.json())
    .then(data => {
      data.forEach(haiku => {
        haiku.disliked = false
        haiku.liked = false
      })
      this.haikus = data
      return this.haikus
    })
    .then(d => console.log(d))
    .catch(err => console.error(err));
  }
  }
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
