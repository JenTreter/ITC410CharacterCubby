export default async function init ({ store }) {
  console.log('loaded')
    await store.dispatch('users/load')
    console.log('loaded')
  }