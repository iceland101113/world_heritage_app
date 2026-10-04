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
  <el-input
    v-model="searchQuery"
    :placeholder="$t('search_placeholder')"
    clearable
    class="search-input"
  />
  <el-table ref="table" class="info-table" :data="tableData" stripe @expand-change="handleExpandChange" :default-expand-all="openrow" row-key="unique_number">
    <el-table-column type="expand">
      <template #default="props">
        <div v-if="props">
          <p>{{ props.row.short_description }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('unique_number')" prop="unique_number" />
    <el-table-column :label="$t('name')" prop="name" />
    <el-table-column :label="$t('country')" prop="country" />
  </el-table>
  <template v-if="total >= 5">
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
// import { ElTable, ElInput, ElPagination } from 'element-plus'
import { mapState } from 'pinia';
import { useStore } from '../../store/main';

export default {
  // components: {
  //   ElTable, ElInput, ElPagination
  // },
  props: {
    location: {
      type: Array,
      required: true
    },
    openrow: {
      type: Boolean,
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
      pageSize: 5,
      searchQuery: '',
      // country : 'AU',
    }
  },
  computed: {
    // 可透過 this.counter 取得狀態
    ...mapState(useStore, ['counter']),
    filteredList() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return this.list;
      return this.list.filter(item =>
        String(item.unique_number).toLowerCase().includes(q) ||
        (item.name && item.name.toLowerCase().includes(q))
      );
    },
  },
  methods: {
    handleExpandChange(row, expandedRows) {
      if (this._closing) return;

      const isExpanding = expandedRows.some(r => r.unique_number === row.unique_number);

      if (isExpanding) {
        this._closing = true;
        expandedRows.forEach(r => {
          if (r.unique_number !== row.unique_number) {
            this.$refs.table.toggleRowExpansion(r, false);
          }
        });
        this._closing = false;
        this.$emit('zoom-to-location', row);
      } else {
        this.$emit('zoom-to-location', null);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getList() {
      this.total = this.filteredList.length;
      const sorted = [...this.filteredList].sort((a, b) => String(a.unique_number).localeCompare(String(b.unique_number), undefined, { numeric: true }));
      this.tableData = sorted.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
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
    },
    searchQuery() {
      this.currentPage = 1;
      this.getList();
    },
    filteredList(val) {
      this.$emit('search-change', val);
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
  .search-input {
    margin-top: 10px;
  }

  .info-table {
    width: 100%;
    margin-top: 10px;
    // text-align: center;
  }

  .example-pagination-block {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>
