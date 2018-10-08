<template>
  <div id='map'>
  </div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import config from '../../config/app.config'
import Marker from '../assets/device_marker.png'

const MAP_CENTER_KEY = 'map_center'
const MAP_ZOOM_KEY = 'map_zoom'

var map
var devices = []
var map_center = [config.defaultMapCenter.lon, config.defaultMapCenter.lat]
var deviceMarker = new Image()
deviceMarker.src = Marker

mapboxgl.accessToken = config.mapboxToken

export default {
  data() {
    return {
      devices: devices
    }
  },
  mounted() {
    this.initMap()
  },
  computed: {
    map_center() {
      return this.$store.getters.mapCenter
    },
    map_zoom() {
      return this.$store.getters.mapZoomLevel
    }
  },
  watch: {
    map_center(newCenter) {
      map.flyTo({
        center: newCenter
      })
    }
  },
  methods: {
    initMap: function() {
      // Get default map center and zoom level.
      // var mapCenter = [config.defaultMapCenter.lon, config.defaultMapCenter.lat]
      var mapZoom = config.defaultMapZoom
      // Get map center and zoom level from local storage if present.
      if (localStorage.getItem(MAP_CENTER_KEY) !== null) {
        // mapCenter = JSON.parse(localStorage.getItem(MAP_CENTER_KEY))
      }
      if (localStorage.getItem(MAP_ZOOM_KEY) !== null) {
        mapZoom = JSON.parse(localStorage.getItem(MAP_ZOOM_KEY))
      }

      // Create mapbox object.
      map = new mapboxgl.Map({
        container: 'map',
        style: config.mapStyles.light,
        center: map_center,
        zoom: mapZoom
      })

      // Bind event listeners.
      map.on('load', this.onMapLoad)
      map.on('zoomend', this.onMapUpdate)
      map.on('moveend', this.onMapUpdate)

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'devices', this.onMapFeatureClick)

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'devices', function () {
          map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'devices', function () {
          map.getCanvas().style.cursor = '';
      });
    },
    onMapLoad: function() {
      // Create marker image.
      map.addImage('device', deviceMarker);

      // Add layer with data.
      map.addLayer({
        id: 'devices',
        type: 'symbol',
        layout: {
          "icon-image": "device",
          "icon-size": 0.5
        },
        source: {
          type: 'geojson',
          data: config.devicesServiceUrl +'?geojson'
        }
      });

      // Test connection.
      axios
        .get(config.devicesServiceUrl + '?geojson')
        .then(response => {
          let notification = {
            text: 'Connected to backend',
            category: 'success',
            dismissAfter: config.notification_timeout
          }
          if (response.status != 200) {
            notification = {
              text: 'Error connecting to backend',
              category: 'danger',
              dismissAfter: config.notification_timeout
            }
          }
          this.$store.dispatch({
            type: 'addNotification',
            notification: notification
          })
        })
        .catch(() => {
          this.$store.dispatch({
            type: 'addNotification',
            notification: {
              text: 'Backend unreachable',
              category: 'danger',
              dismissAfter: config.notification_timeout
            }
          })
        })
    },
    onMapUpdate: function(e) {
      // Update localstorage for center and zoom level
      // when user manipulates map.
      if(e.target !== null && e.target.getCenter() !== null) {
        var mapCenter = [e.target.getCenter().lng, e.target.getCenter().lat]
        var mapZoom = e.target.getZoom()
        localStorage.setItem(MAP_CENTER_KEY, JSON.stringify(mapCenter))
        localStorage.setItem(MAP_ZOOM_KEY, mapZoom)
      }
      // Get the bounds for the map (sw, ne)
      // console.log(e.target.getBounds())
    },
    onMapFeatureClick: function (e) {
      // Get coordinates and description from feature.
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Display popup with description.
      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('<strong>Name:</strong> <em>'+description+'</em>')
          .addTo(map);
    }
  }
}
</script>

<style>
#map {
  height:100vh;
}
.mapboxgl-canvas {
  outline: none !important;
}
.search {
  position: fixed;
  top: 60px;
  left: 6px;
  z-index: 1000;
}
</style>
