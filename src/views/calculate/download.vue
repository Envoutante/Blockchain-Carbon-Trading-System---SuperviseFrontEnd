<template>
  <div style="margin: 0 0 30px 0">
    <a-card hoverable style="width: 240px" @click="previewPDF">
      <template #cover>
        <div style="display: flex; justify-content: center; padding-top: 20px">
          <img alt="example" src="@/assets/pdf.png" style="width: 50%" />
        </div>
      </template>
      <a-card-meta title="企业数据来源文件">
        <template #description
          >数据来源文件包括温室气体排放报告、监测报告和第三方验证报告。
        </template>
      </a-card-meta>
    </a-card>

    <el-dialog :visible.sync="previewDialog">
      <template>
        <div>
          <div class="tools" style="display: flex; justify-content: center">
            <el-button
              :theme="'default'"
              type="submit"
              :title="'上一页'"
              @click.stop="prePage"
              class="mr10"
            >
              上一页</el-button
            >
            <el-button
              :theme="'default'"
              type="submit"
              :title="'下一页'"
              @click.stop="nextPage"
              class="mr10"
            >
              下一页</el-button
            >
            <el-button
              :theme="'default'"
              type="submit"
              :title="'顺时针旋转'"
              @click.stop="clock"
              class="mr10"
            >
              顺时针旋转</el-button
            >
            <el-button
              :theme="'default'"
              type="submit"
              :title="'逆时针旋转'"
              @click.stop="counterClock"
              class="mr10"
            >
              逆时针旋转</el-button
            >
            <el-button
              :theme="'default'"
              type="submit"
              :title="'下载'"
              @click.stop="pdfDownload"
              class="mr10"
            >
              下载</el-button
            >
            <el-button
              :theme="'default'"
              type="submit"
              :title="'打印'"
              @click.stop="pdfPrintAll"
              class="mr10"
            >
              打印</el-button
            >
          </div>
          <pdf
            ref="pdf"
            :src="url"
            :page="pageNum"
            :rotate="pageRotate"
            @progress="loadedRatio = $event"
            @page-loaded="pageLoaded($event)"
            @num-pages="pageTotalNum = $event"
            @error="pdfError($event)"
            @link-clicked="page = $event"
          ></pdf>
          <div style="text-align: center" class="page">
            {{ pageNum }}/{{ pageTotalNum }}
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import PDF from "vue-pdf";
import FileSaver from "file-saver";

export default {
  components: {
    pdf: PDF,
  },

  data() {
    return {
      previewDialog: false,
      url: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      name: "莫某",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
    };
  },

  methods: {
    // 预览 PDF
    previewPDF(row, index) {
      this.previewDialog = true;
      console.log("", row, index);
    },
    // 上一页函数，
    prePage() {
      var page = this.pageNum;
      page = page > 1 ? page - 1 : this.pageTotalNum;
      this.pageNum = page;
    },
    // 下一页函数
    nextPage() {
      var page = this.pageNum;
      page = page < this.pageTotalNum ? page + 1 : 1;
      this.pageNum = page;
    },
    // 页面顺时针翻转90度。
    clock() {
      this.pageRotate += 90;
    },
    // 页面逆时针翻转90度。
    counterClock() {
      this.pageRotate -= 90;
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded(e) {
      this.curPageNum = e;
    },
    // 错误时回调函数。
    pdfError(error) {
      console.error(error);
    },
    // 打印全部
    pdfPrintAll() {
      /**
       * 打印界面字符乱码是因为你pdf中使用了自定义字体导致的,谷歌浏览器打印的时候预览界面真的变成了真·方块字 ,解决方案如下：
       * 用文章最后的pdfjsWrapper.js在替换掉node_modules/vue-pdf/src/pdfjsWrapper.js
       */
      console.log("打印");
      this.$refs.pdf.print();
    },
    pdfDownload() {
      const that = this;
      var oReq = new XMLHttpRequest();
      var URL = this.url;
      oReq.open("GET", URL, true);
      oReq.responseType = "blob";
      oReq.onload = function () {
        var file = new Blob([oReq.response], {
          type: "blob",
        });
        FileSaver.saveAs(file, that.name); // that.name为文件名
      };
      oReq.send();
    },
  },
};
</script>
