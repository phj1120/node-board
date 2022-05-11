http://localhost:8080/#/board/write

<template>
  <div class="root">
    <v-text-field v-model="form.title" label="글 제목"></v-text-field>
    <v-textarea v-model="form.body" label="내용"></v-textarea>
    <div class="text-center">
      <v-btn @click="submit" color="primary">글쓰기</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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

      // TODO : 서버에 전송해서 글 쓰기
      this.axios.post("/api/board/write", this.form).then((result) => {
        console.log(result);
      });
      this.$router.push("/board");

      // this.$router.go(-1); // 뒤로가기
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
