<template>
  <div>
    <el-button type="primary" @click="toImage">下载</el-button>
    <div >
      <div ref="imageWrapper">
        <TreeChart :json="treeData" @click-node="some" />
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import TreeChart from "vue-tree-chart";
export default {
  components: {
    TreeChart
  },
  data() {
    return {
      imgUrl: "",
      treeData: {
        name: "组织分布",
        image_url: "",
        children: [
          {
            name: "党总支1",
            image_url: ""
          },
          {
            name: "党总支2",
            image_url: "",
            // mate: {
            //   name: "mate",
            //   image_url: ""
            // },
            children: [
              {
                name: "党支部1"
              },
              {
                name: "党支部2",
                image_url: ""
              },
              {
                name: "党支部3党支部3党支部3党支部3",
                image_url: ""
              }
            ]
          },
          {
            name: "党总支3",
            image_url: ""
          }
        ]
      }
    };
  },
  methods: {
    some(val) {
      console.log(val.name);
      console.log(val.image_url);
    },
    toImage() {
      console.log(this.$refs.imageWrapper);
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imgUrl = dataURL;
        if (this.imgUrl !== "") {
          // console.log(this.imgUrl);
          this.downloadFile("组织树状图.png", this.imgUrl);
        }
      });
    },

    downloadFile(fileName, content) {
      let aLink = document.createElement("a");
      let blob = this.base64ToBlob(content); //new Blob([content]);

      let evt = document.createEvent("HTMLEvents");
      console.log("点击下载", evt);
      evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);

      // aLink.dispatchEvent(evt);
      aLink.click();
    },

    base64ToBlob(dataurl) {
      var arr = dataurl.split(",");
      //注意base64的最后面中括号和引号是不转译的
      var _arr = arr[1].substring(0, arr[1].length - 2);
      var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(_arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    }
  },
  created() {
    let adata = [
      {
        children: [
          {
            name: "中共安徽鼎信项目管理股份有限公司支部委员会",
            icon:
              "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/ef6a0472-0f64-47df-aaad-63badcb7129f.png",
            id: 2
          }
        ],
        name: "区直党委",
        icon:
          "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/038a62fd-e6b0-40ab-a56a-0633d24d7de5.png",
        id: 21
      },
      {
        name: "长信组织",
        icon:
          "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/038a62fd-e6b0-40ab-a56a-0633d24d7de5.png",
        id: 47
      },
      {
        children: [
          {
            name: "方兴居委会",
            icon:
              "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/ef6a0472-0f64-47df-aaad-63badcb7129f.png",
            id: 57
          }
        ],
        name: "长信科技",
        icon:
          "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/038a62fd-e6b0-40ab-a56a-0633d24d7de5.png",
        id: 52
      },
      {
        children: [
          {
            children: [
              {
                name: "测试党总支第一支部",
                icon:
                  "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/ef6a0472-0f64-47df-aaad-63badcb7129f.png",
                id: 56
              }
            ],
            name: "测试党总支",
            icon:
              "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/ef6a0472-0f64-47df-aaad-63badcb7129f.png",
            id: 55
          }
        ],
        name: "临湖社区党委",
        icon:
          "https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/038a62fd-e6b0-40ab-a56a-0633d24d7de5.png",
        id: 54
      }
    ];

    adata = JSON.stringify(adata).replace(/"id"/g, '"image_url"');
    console.log(this.treeData);
    this.treeData.children = JSON.parse(adata);
    console.log(this.treeData);
  }
};
// import { login } from "../api/http";
// export default {
// async created() {
//    let res =await login()
//  },
// }
</script>

<style>
td {
  border: none;
}
.avat {
  display: none !important;
}
.name {
  width: auto !important;
  min-width: 5rem;
  padding: 0 0.5rem;
  height: 2rem !important;
  border: 1px solid red;
  box-sizing: border-box;
  background-color: red;
  border-radius: 10rem;
  line-height: 2rem !important;
}
.node .person {
  z-index: 2 !important;
  width: auto !important;
  overflow: hidden !important;
}
.node {
  color: aliceblue;
  z-index: 2;
  width: 10rem !important;
  overflow: hidden;
}
</style>
