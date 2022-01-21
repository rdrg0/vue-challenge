<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <NavDrawer @category-selected="showCategory" />
    </v-navigation-drawer>
    <v-navigation-drawer v-model="cartDrawer" right app>
      <div>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Carrito </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="detail in cart" :key="detail.product.id" link>
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                >{{ detail.product.name }} x{{ detail.quantity }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>LOGO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="cartDrawer = !cartDrawer" class="mr-4" icon>
        <v-badge
          color="green"
          :content="Object.keys(this.cart).length"
          :value="Object.keys(this.cart).length"
        >
          <v-icon> mdi-cart-outline </v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <h2>{{ title }}</h2>
        <v-row>
          <v-col
            v-for="product in selected"
            :key="product.code"
            align="center"
            xs="12"
            sm="4"
            md="3"
          >
            <v-card height="400" min-width="200" max-width="300">
              <v-img
                :src="product.photo"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300"
              >
              </v-img>

              <v-card-actions>
                <div
                  calss="d-flex flex-column align-center"
                  style="width: 100%"
                >
                  <p class="text-xs mb-0" :title="product.name">
                    {{ truncate(product.name, 25) }}
                  </p>
                  <p class="text.xs mb-0">
                    $ {{ (product.price / 100).toFixed(2) }}
                  </p>
                  <form class="d-flex flex-row justify-center">
                    <input
                      :ref="'product' + product.id"
                      class="m-0 number-input"
                      type="number"
                    />
                    <v-btn @click="addToCart(product.id)" icon>
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                  </form>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";
import getData from "./services/getData";

export default {
  name: "App",

  components: {
    NavDrawer,
  },

  data: () => ({
    drawer: false,
    cartDrawer: false,
    products: null,
    selected: null,
    title: "Products",
    cart: {},
  }),
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      getData("http://sva.talana.com:8000/api/product/").then((res) => {
        console.log(res);
        this.products = this.selected = res;
      });
    },
    showCategory({ id, name }) {
      this.title = name;
      this.selected = this.products.filter(
        (product) => product.category.id === id
      );
      this.drawer = false;
      console.log(this.selected);
    },
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },
    addToCart(id) {
      console.log(id);
      const quantity = +this.$refs["product" + id][0].value;
      if (this.cart[id]) {
        this.cart[id].quantity += quantity;
      } else {
        const product = this.products.find((product) => product.id == id);
        this.cart[id] = { product, quantity };
      }
      console.log(Object.keys(this.cart).length);
    },
  },
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
.number-input {
  border: 1px solid black;
  padding: 2px;
  border-radius: 8px;
  width: 60px;
}
</style>

