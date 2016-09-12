Vue.component('thumbnail', {
  template: "#thumbnail-template",
  props: ['image'],
  methods: {
    displayImage: function () {
      var dialog = document.querySelector('dialog');
      var showDialogButton = this.$el
      dialog.querySelector(".dialog_image").src = this.image.src
      dialog.querySelector(".caption").innerHTML = "<table><tbody><tr><th>"+ this.image.title + "</th><td>"+ this.image.desc + "</td></tr></tbody></table>"
      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      showDialogButton.addEventListener('click', function() {
        dialog.showModal();
      });
      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
    }
  },
})

var appVue = new Vue({
  el: '#memories',
  data: {
    sort:'id',
    order: 1,
    searchText: '',
    fields: ['title', 'site', 'desc'],
    images: [
      {
        id: 1,
        src: 'http://images.grasshopper.com/2013/10/happy-people-coworking.jpg',
        title: '1',
        date: '2016',
        site: 'Malaysia',
        like: 4,
        desc: 'tralala',
      },
      {
        id: 2,
        src: 'http://www.projectmanagers.net/i/wp-content/uploads/2013/02/bigstock-Group-of-happy-young-business-50927732.jpg',
        title: '2',
        date: '2013',
        site: 'Spain',
        like: 1,
        desc: 'trolo',
      },
      {
        id: 3,
        src: 'http://i.huffpost.com/gen/1832336/images/n-HAPPY-EMPLOYEE-large570.jpg',
        title: '3',
        date: '2016',
        site: 'USA',
        like: 0,
        desc: 'pouet',
      },
      {
        id: 4,
        src: 'http://il6.picdn.net/shutterstock/videos/5658755/thumb/9.jpg',
        title: '3',
        date: '2015',
        site: 'Sweden',
        like: 3,
        desc: 'fart',
      },
      {
        id: 4,
        src: 'http://1.bp.blogspot.com/_AsgGlcNuJtU/S_ClPsz4CII/AAAAAAAAAgI/yboWMv0YSi8/s1600/happy_office_hour.jpg',
        title: '3',
        date: '2015',
        site: 'Sweden',
        like: 3,
        desc: 'fart',
      },
    ]
  },
  computed: {
    featured: function() {
      var currentMax = 0;
      var result = null;
      this.images.forEach(function(image) {
        if(image.like >= currentMax){
          currentMax = image.like;
          result = image;
        }
      });
      return result;
    },
    years: function() {
      var result = new Array();
      this.images.forEach(function(image){
        if (result.indexOf(image.date) < 0) {
            result.push(image.date);
        }
      });
      result.sort().reverse();
      return result;
    },
    cities: function () {
      var result = new Array();
      this.images.forEach(function(image) {
        if (result.indexOf(image.site) < 0) {
            result.push(image.site);
        }
      });
      result.sort()
      return result;
    }
  },
})
