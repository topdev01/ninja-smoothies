<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit a smoothie : {{ this.$route.params.smoothie_slug }}</h2>

    <form @submit.prevent="EditSmoothie">
      <div class="field-title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredients">ingredients:</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIng(ing);">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient" class="title">Add an ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <label class="error" v-if="feedback">{{ feedback }}</label>

      <div class="field center-align"></div>
      <button class="btn pink">Update Smoothie</button>
    </form>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  components: {},
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
  methods: {
    EditSmoothie() {
      console.log(this.smoothie.title, this.smoothie.ingredients);

      if (this.smoothie.title) {
        this.feedback = null;
        //create slug

        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });
        console.log(this.slug);
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            //this.$router.push({ name: "Index" });
            this.flashMessage.show({
              status: "success",
              title: "firebase Database Updated",
              message: this.smoothie.title + " saved !",
              destroyed: () => this.$router.push({ name: "Index" })
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "Add Smoothie title";
      }
    },

    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        console.log(this.ingredients);
        this.feedback = null;
      } else {
        this.feedback = "Please add an Ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    }
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.error {
  color: red;
  font-size: larger;
}
</style>
