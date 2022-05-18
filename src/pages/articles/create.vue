<script setup lang="ts">
const form = ref({
  title: "",
  description: "",
  body: "",
  tagList: [],
})
</script>

<template>
  <div class="container" flex flex-col>
    <div lg:w-2xl mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2>Your new post</h1>
      </div>
      <form flex flex-col gap-4>
        <div>
          <input
            v-model="form.title"
            type="email"
            placeholder="Post Title"
            class="form-control"
          />
        </div>
        <div>
          <textarea
            v-model="form.body"
            type="password"
            placeholder="Short description"
            class="form-control"
          />
        </div>
        <div>
          <textarea
            v-model="form.body"
            type="password"
            placeholder="Write your post (in markdown)"
            class="form-control"
            h-100
          />
        </div>
        <div>
          <input
            v-model="form.tagList"
            type="text"
            placeholder="Tags"
            class="form-control"
          />
        </div>

        <div flex justify-end>
          <button class="btn btn-primary" type="submit">Create Post</button>
        </div>
      </form>
    </div>
  </div>
</template>
