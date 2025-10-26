(function () {
  const endpoint = window.VISITOR_COUNT_ENDPOINT || null;
  const el = document.getElementById('visitorCount');
  const year = document.getElementById('year');
  
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  async function fetchCount() {
    if (!el) {
      console.warn('visitorCount elementi bulunamadı');
      return;
    }
    
    if (!endpoint) {
      console.warn('VISITOR_COUNT_ENDPOINT tanımlanmamış');
      el.textContent = '-';
      return;
    }

    try {
      console.log('Fetching from:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: { 
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid JSON response');
      }

      console.log('Parsed data:', data);

      // Lambda response body'sini parse et
      let count = null;
      
      if (data && typeof data === 'object') {
        // API Gateway response format: { statusCode, body, headers }
        if (data.body) {
          console.log('Body type:', typeof data.body);
          
          if (typeof data.body === 'string') {
            try {
              const bodyObj = JSON.parse(data.body);
              console.log('Parsed body:', bodyObj);
              count = bodyObj.count;
            } catch (e) {
              console.error('Body parse error:', e);
            }
          } else if (typeof data.body === 'object') {
            count = data.body.count;
          }
        }
        // Direct response format: { count: number }
        else if (typeof data.count !== 'undefined') {
          count = data.count;
        }
      }

      console.log('Final count value:', count);

      if (typeof count === 'number' && Number.isFinite(count)) {
        el.textContent = count.toLocaleString('tr-TR');
      } else if (count === null || count === undefined) {
        el.textContent = '0';
        console.warn('Count is null/undefined, showing 0');
      } else {
        el.textContent = '-';
        console.warn('Invalid count value:', count);
      }

    } catch (error) {
      console.error('Fetch error:', error);
      el.textContent = '-';
    }
  }

  fetchCount();
})();