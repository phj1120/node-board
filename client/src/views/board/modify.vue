http://localhost:8080/#/board/modify

<template>
  <div>
    <mjc-header></mjc-header>
    <div class="root">
      <v-text-field v-model="form.title" label="글 제목"></v-text-field>
      <v-textarea v-model="form.body" label="내용"></v-textarea>
      <div class="text-center">
        <v-btn @click="submit" color="primary">수정</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MjcHeader from "@/components/MjcHeader";

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
  mounted() {
    this.getBoardItem();
  },
  methods: {
    getBoardItem() {
      this.axios
        .post("/api/board/item", { bno: this.$route.params.bno })
        .then((result) => {
          console.log(result);
          this.form = result.data.board;
        });
    },

    submit() {
      if (this.form.title == "") {
        window.alert("제목을 입력해 주세요");
        return;
      } else if (this.form.body == "") {
        window.alert("내용을 입력해 주세요");
        return;
      }

      this.axios.post("/api/board/modify", this.form).then((result) => {
        if (result.data.result == "ok") {
          window.alert("수정 완료 되었습니다.");
          this.$router.go(-1);
        } else {
          window.alert(result.data.msg);
          this.$router.push("/board");
        }
      });
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
