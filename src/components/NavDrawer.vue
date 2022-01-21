<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Categorias </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory({ id: category.id, name: category.name })"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-tag</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import getData from "../services/getData";
export default {
  data() {
    return {
      categories: null,
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      getData("http://sva.talana.com:8000/api/product-category/").then(
        (res) => {
          console.log(res);
          this.categories = res;
        }
      );
    },
    selectCategory(categoryData) {
      this.$emit("category-selected", categoryData);
    },
  },
};
</script>