---
title: Vue select in nested data
date: '2019-07-11'
spoiler: Pain point select2 in nested data (state), how to deal with ?
---

---

Sulit jika data dropdown kita sudah ratusan hingga ribuan ga mungkin dong kita scroll satu persatu untuk mendapatkan data yang kita mau, salah satu solusinya search filter menggunakan [select2](https://select2.org/). Tapi bagaimana mengimplementasikan di VueJS terlebih jika state kita nested, saya sendiri sudah mencoba beberapa package namun akhirnya jatuh pilihan ke [vue-select](https://github.com/sagalbot/vue-select). 


**Install**

```bash
$ npm install vue-select
```

```js
<template>
    <div class="col-md-6" :class="{ 'has-danger': errors.product_id }">
    <label>Products</label>

    // reduce bertugas memasukkan properti id ke dalam v-model
    // jika tidak menggunakan reduce, yg akan ke bind ke dalam
    // v-model adalah object dari products. karna kita hanya ingin
    // properti id saja yg terbind ke dalam form.product
    <v-select
        v-model="form.product"
        :options="products"
        :reduce="product => product.id" 
    />
    <div
        class="form-control-feedback"
        v-if="errors.product_id"
    >{{ errors.product_id[0] }}</div>
    </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      form: {
        product: "",
      },
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const response = await axios.get('some_endpoint);
      const result = await response.data;

      result.map(res => {
        this.products.push({
          id: res.id,
          label: res.name
        });
      });
    },
  }
};
</script>

```

![](https://media.giphy.com/media/Ib5sFcMGgFDFkHT84b/giphy.gif)