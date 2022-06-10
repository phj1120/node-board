http://localhost:8080/#/board
<template>
  <div class="root">
    <mjc-header></mjc-header>
    <div>
      <table class="table-container">
        <thead>
          <tr>
            <th width="80px">no</th>
            <th width="100px">제목</th>
            <th width="100px">작성자</th>
            <th width="80px">조회수</th>
            <th width="120px">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="board in boardList"
            :key="board.id"
            @click="clickBoardItem(board)"
          >
            <td class="text-center">{{ board.bno }}</td>
            <td>{{ board.title }}</td>
            <td class="text-center">
              <div v-if="board.writeUser">
                {{ board.writeUser.name }}
              </div>
            </td>
            <td class="text-center">{{ board.viewCnt }}</td>
            <!-- <td class="text-center">{{ dateFormat(board.writeTime) }}</td> -->
            <td class="text-center">{{ board.writeTime | dateFormat }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        @input="changePage"
        :length="pageCount"
      ></v-pagination>
    </div>
    <div v-if="$store.state.user" class="text-right mt-2">
      <v-btn color="primary" @click="moveWrite">글쓰기</v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MjcHeader from "@/components/MjcHeader";

export default {
  components: {
    MjcHeader: MjcHeader,
    // MjcHeader,
    // MjcHeader2: MjcHeader,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      boardList: [],
    };
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm");
    },
  },
  mounted() {
    this.axios.post("/api/board/list").then((result) => {
      this.boardList = result.data.boardList;
      this.pageCount = result.data.pageCount;
    });
  },

  methods: {
    clickBoardItem(board) {
      this.$router.push("/board/item/" + board.bno);
    },

    moveWrite() {
      this.$router.push("/board/write");
    },

    changePage(page) {
      this.axios.post("/api/board/list", { page: page }).then((result) => {
        this.boardList = result.data.boardList;
        this.pageCount = result.data.pageCount;
      });
    },
    // dateFormat(dateStr) {
    //   return moment(dateStr).format("YYYY-MM-DD HH:mm");
    // },
  },
};
</script>

<style scoped>
/* 지금 list.vue 에서만 적용되는 CSS 다 */
.table-container {
  width: 700px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
td {
  border-bottom: 1px solid #ccc;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0 auto;
}
</style>
