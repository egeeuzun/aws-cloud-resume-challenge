// Iris sayfası için veri yükleme ve görselleştirme
(async function () {
  const CSV_URL = 'data/iris.csv';

  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(l => l.split(','));
    return rows.map(cells => Object.fromEntries(headers.map((h, i) => [h, cells[i]])));
  }

  function toNum(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }

  function groupBy(arr, key) {
    return arr.reduce((acc, x) => { const k = x[key]; (acc[k] ||= []).push(x); return acc; }, {});
  }

  function stats(nums) {
    const n = nums.length;
    const mean = nums.reduce((a,b)=>a+b,0)/n;
    const variance = nums.reduce((a,b)=>a + (b-mean)**2,0)/n;
    const std = Math.sqrt(variance);
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return { n, mean, std, min, max };
  }

  function renderPreview(el, data, limit=10) {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const head = data.slice(0, limit);
    const th = keys.map(k=>`<th>${k}</th>`).join('');
    const rows = head.map(r=>`<tr>${keys.map(k=>`<td>${r[k]}</td>`).join('')}</tr>`).join('');
    el.innerHTML = `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
    el.querySelector('table').style.width = '100%';
    el.querySelectorAll('th,td').forEach(c=>{ c.style.padding='6px 8px'; c.style.borderBottom='1px solid var(--border)'; });
  }

  function renderSummary(el, data) {
    const cols = ['sepal_length','sepal_width','petal_length','petal_width'];
    const lines = cols.map(c => {
      const s = stats(data.map(d=>toNum(d[c])));
      return `${c}: n=${s.n}, ort=${s.mean.toFixed(2)}, std=${s.std.toFixed(2)}, min=${s.min.toFixed(2)}, max=${s.max.toFixed(2)}`;
    });
    el.innerHTML = `<strong>Özet İstatistikler</strong><br>${lines.join('<br>')}`;
  }

  try {
    const res = await fetch(CSV_URL);
    const csvText = await res.text();
    const raw = parseCSV(csvText);
    // normalize types
    const data = raw.map(r => ({
      sepal_length: toNum(r.sepal_length) ?? toNum(r.SepalLengthCm) ?? null,
      sepal_width: toNum(r.sepal_width) ?? toNum(r.SepalWidthCm) ?? null,
      petal_length: toNum(r.petal_length) ?? toNum(r.PetalLengthCm) ?? null,
      petal_width: toNum(r.petal_width) ?? toNum(r.PetalWidthCm) ?? null,
      species: r.species || r.Species || r.class || 'unknown'
    })).filter(d => d.sepal_length!=null);

    // UI: preview + summary
    renderPreview(document.getElementById('preview'), data.map(d => ({...d})));
    renderSummary(document.getElementById('summary'), data);

    // group by species for colors
    const bySp = groupBy(data, 'species');
    const palette = {
      setosa: '#1f77b4',
      versicolor: '#ff7f0e',
      virginica: '#2ca02c'
    };

    // Histograms: sepal length
    const hist1 = Object.entries(bySp).map(([sp, arr]) => ({
      type: 'histogram', name: sp, x: arr.map(d=>d.sepal_length), opacity: 0.7, marker: {color: palette[sp]||undefined}
    }));
    Plotly.newPlot('histSepLen', hist1, {barmode:'overlay', title:'Sepal Length Dağılımı', xaxis:{title:'sepal_length'}, yaxis:{title:'frekans'}}, {displayModeBar:false});

    // Histogram: sepal width
    const hist2 = Object.entries(bySp).map(([sp, arr]) => ({
      type: 'histogram', name: sp, x: arr.map(d=>d.sepal_width), opacity: 0.7, marker: {color: palette[sp]||undefined}
    }));
    Plotly.newPlot('histSepWid', hist2, {barmode:'overlay', title:'Sepal Width Dağılımı', xaxis:{title:'sepal_width'}, yaxis:{title:'frekans'}}, {displayModeBar:false});

    // Scatter: sepal_length vs sepal_width
    const sc1 = Object.entries(bySp).map(([sp, arr]) => ({
      type: 'scattergl', mode: 'markers', name: sp,
      x: arr.map(d=>d.sepal_length), y: arr.map(d=>d.sepal_width), marker: {size:8, color: palette[sp]||undefined}
    }));
    Plotly.newPlot('scatterSepal', sc1, {title:'Sepal Length vs Width', xaxis:{title:'sepal_length'}, yaxis:{title:'sepal_width'}}, {displayModeBar:false});

    // Scatter: petal_length vs petal_width
    const sc2 = Object.entries(bySp).map(([sp, arr]) => ({
      type: 'scattergl', mode: 'markers', name: sp,
      x: arr.map(d=>d.petal_length), y: arr.map(d=>d.petal_width), marker: {size:8, color: palette[sp]||undefined}
    }));
    Plotly.newPlot('scatterPetal', sc2, {title:'Petal Length vs Width', xaxis:{title:'petal_length'}, yaxis:{title:'petal_width'}}, {displayModeBar:false});

  } catch (e) {
    console.error('Iris verisi yüklenemedi:', e);
    document.getElementById('summary').textContent = 'Veri yüklenemedi.';
  }
})();

