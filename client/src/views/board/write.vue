http://localhost:8080/#/board/write

<template>
  <div>
    <mjc-header></mjc-header>
    <div class="root">
      <v-text-field v-model="form.title" label="글 제목"></v-text-field>
      <v-textarea v-model="form.body" label="내용"></v-textarea>
      <div class="text-center">
        <v-btn @click="submit" color="primary">글쓰기</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MjcHeader from "@/components/MjcHeader";
import axios from "axios";
export default {
  components: {
    MjcHeader,
  },
  data() {
    return {
      form: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    submit() {
      if (this.form.title == "") {
        window.alert("제목을 입력해 주세요");
        return;
      }
      if (this.form.body == "") {
        window.alert("내용을 입력해 주세요");
        return;
      }

      this.axios.post("/api/board/write", this.form).then((result) => {
        console.log(result);
      });
      this.$router.push("/board");
    },
  },
};
</script>

<style scoped>
.root {
  width: 700;
  margin: 0 auto;
}
</style>
