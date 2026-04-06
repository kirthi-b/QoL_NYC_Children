/**
 * Paste this into Chrome DevTools console while on https://urban-mobility-index.yolasite.com/
 * It fetches key images via same-origin and triggers downloads.
 *
 * If Chrome blocks multiple downloads, click "Allow" in the download bar.
 */
(async () => {
  const images = [
    { path: '/ws/media-library/fce71e603b714f4790517468cec70d70/method.png', name: 'methodology-pipeline.png' },
    { path: '/ws/media-library/ea638a064db3453690fa0d14404c00cd/road-maps.jpg', name: 'road-maps.jpg' },
    { path: '/ws/media-library/13bfb509c66d4a8bad484a0f75d94bbe/dc_node.png', name: 'dc-node.png' },
    { path: '/ws/media-library/cae0e18df9e840ee961ea3fb8a9116e9/kmeans.png', name: 'kmeans-clustering.png' },
    { path: '/ws/media-library/30d7a79679354adc820c2a20aa041f6e/agglomerative-clustering.png', name: 'agglomerative-clustering.png' },
    { path: '/ws/media-library/0a93fc5b8edc40d983c019f98e5964cc/gaussian-mixture.png', name: 'gaussian-mixture.png' },
    { path: '/ws/media-library/52080f10f274492dbe244eef9f052a99/pmcbpppbska', name: 'regression-plot.png' },
    { path: '/ws/resized-images/a8ecfe9f5923456cb9fd70ffad608ef5/chicago_hex.png', name: 'chicago-hex.png' },
    { path: '/ws/resized-images/276a81138eab4bd7873befdad0d042f6/nyc_hex.png', name: 'nyc-hex.png' },
    { path: '/ws/resized-images/a457d5b2631042d0a6eebc9b8b507929/sf_hex.png', name: 'sf-hex.png' },
    { path: '/ws/media-library/e761240a8c004ce59dd89f82f3bc6176/final-table.png', name: 'final-table.png' },
    { path: '/ws/media-library/c8698dce5f4c4b2ca962b9af37a2806c/header.png', name: 'header.png' },
  ];

  for (const img of images) {
    try {
      const r = await fetch(img.path);
      if (!r.ok) { console.log(`FAIL ${img.name}: ${r.status}`); continue; }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = img.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log(`OK ${img.name}: ${(blob.size/1024).toFixed(1)}KB`);
      await new Promise(r => setTimeout(r, 500));
    } catch(e) {
      console.log(`ERR ${img.name}: ${e.message}`);
    }
  }
  console.log('Done! Move files from Downloads to src/images/projects/urban-mobility/');
})();
