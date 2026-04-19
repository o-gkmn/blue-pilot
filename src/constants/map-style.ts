export const MAP_STYLE = {
  version: 8,
  sources: {
    "map-source": {
      type: "raster",
      tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "map-layer",
      type: "raster",
      source: "map-source",
    },
  ],
};
