<template>
  <!-- <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in location" :key="key">
        <td @click="zoomToLocation(item)">{{ item.name_en }}</td>
        <td>{{ item.states_name_en }}</td>
      </tr>
    </tbody>
  </table> -->
  <el-table class="info-table" :data="tableData" stripe @expand-change="handleExpandChange">
    <el-table-column type="expand">
      <template #default="props">
        <p>{{ props.row.short_description_en }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="name_en" />
    <el-table-column label="Country" prop="states_name_en" />
  </el-table>
  <template v-if="total >= 10">
    <div class="example-pagination-block">
      <el-pagination 
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"/>
    </div>
  </template>
  <!-- <div>{{ this.counter }}</div> -->
</template>

<script>
import { ElTable, ElInput, ElPagination } from 'element-plus'
import { mapState } from 'pinia';
import { useStore } from '../../store/main';

export default {
  components: {
    ElTable, ElInput, ElPagination
  },
  props: {
    location: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      country: { name: 'AU' },
      options: [],
      currentPage: 1, 
      total: 0, 
      list: this.location, 
      tableData: [], 
      pageSize: 10, 
      // country : 'AU',
    }
  },
  computed: {
    // 可透過 this.counter 取得狀態
    ...mapState(useStore, ['counter']),
  },
  methods: {
    handleExpandChange(row, expandedRows) {
      console.log(row);
      console.log(expandedRows);
      if (expandedRows.length > 0) {
        this.$emit('zoom-to-location', row);
      }
      // } else {
      //   this.$emit('zoom-to-location', null); 
      // }
    },
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.getList();
    },
    getList() {
      this.total = this.list.length;
      this.tableData = this.list.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
  watch: {
    location: {
      handler: function (val, _oldVal) {
        this.list = val;
        this.currentPage = 1;
        this.getList();
      },
      deep: true
    }
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
  .info-table {
    width: 100%;
    margin-top: 20px;
    // text-align: center;
  }

  .example-pagination-block {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>
