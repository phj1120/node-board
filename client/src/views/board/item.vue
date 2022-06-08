<template>
  <div v-if="board != null">
    <mjc-header></mjc-header>
    <div class="board">
      <div class="title">제목 : {{ board.title }}</div>
      <div v-if="board.writeUser" class="writer">
        작성자 : {{ board.writeUser.name }}
      </div>
      <div class="board">내용 : {{ board.body }}</div>

      <div class="text-center">
        <v-btn color="primary" @click="modifyBoard">수정</v-btn>
        <v-btn color="error" @click="removeBoard">삭제</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MjcHeader from "@/components/MjcHeader.vue";
export default {
  components: {
    MjcHeader: MjcHeader,
  },
  data() {
    return {
      board: null,
    };
  },
  mounted() {
    this.getBoardItem();
  },
  methods: {
    getBoardItem() {
      console.log(this.$route.params.bno);
      this.axios
        .post("/api/board/item", { bno: this.$route.params.bno })
        .then((result) => {
          this.board = result.data.board;
        });
    },
    removeBoard() {
      console.log(this.$route.params);
      this.axios
        .post("/api/board/remove", {
          bno: this.$route.params.bno,
        })
        .then((result) => {
          if (result.data.result == "ok") {
            this.$router.push("/board");
          } else {
            alert(result.data.msg);
          }
        });
    },
    modifyBoard() {
      // TODO 글 작성자와 로그인한 사용자가 같을 경우에만 수정 창으로 이동하도록
      // 쿠키에는 session Id 만 있고 session 을 DB 에 관리
      // axios 로 expresss 에 사용자 아이디 가져올 수 있도록 메서드 추가.
      console.log(this.board.userId);
      this.$router.push("/board/modify/" + this.board.bno);
    },
  },
};
</script>

<style></style>
