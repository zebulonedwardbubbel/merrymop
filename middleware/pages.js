export default function(context) {
    // go tell the store to update the page
    context.store.commit('updatePage', context.route.name);
    // console.log(context.route);
    // return new Promise((resolve) => {
    //     // Wait 1 second between each route
    //     setTimeout(resolve, 1000);
    // })
}