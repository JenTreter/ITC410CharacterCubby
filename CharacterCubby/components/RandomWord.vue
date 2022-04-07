<template>
  <div>
    <!-- 6. Replace the standard "Picker" label a slot that allows you to place a label. The slot should have a default value of "Picker" -->
    <div>
        {{label}}
      Random Pokemon Nature:
      {{ currentNature }}
    </div>

    <!-- 5. Have the buttons increment and decrement the value -->
    <div>
      <v-btn v-on:click="picker">New Nature</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomWord',
  // 1. Add "props" to accept "value" attribute (it must be a number and defaults to zero)
  props: {
    nature: String
  },
  // 2. Add "props" to accept "min" attribute (it must be a number)
  // 3. Add "props" to accept "max" attribute (it must be a number)
  // 4. Add methods to increment and decrement the value so long as the value stays within the max and min defined values
 data: function () {
  return {
    natures: ['Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty', 'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax', 'Timid', 'Hasty', 'Serious', 'Naive', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash', 'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'],
    currentNature: ''
    }
},
props: {
    label: String
},
methods: {
    picker: function(){
        var chosenNumber = Math.floor(Math.random() * this.natures.length);
        console.log(chosenNumber)
        this.currentNature = this.natures[chosenNumber];
        this.$emit('picker', this.currentNature)
    }
}
}
</script>

<style scoped lang="stylus">
</style>