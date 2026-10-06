const { nikParse } = require('../lib/nik_parse.js');

module.exports = async (req, res) => {
  // CORS headers for public API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let nik = null;

    if (req.method === 'GET') {
      nik = req.query.nik || req.query.n;
    } else if (req.method === 'POST') {
      // Support both form and JSON body
      if (typeof req.body === 'string') {
        try {
          const parsed = JSON.parse(req.body);
          nik = parsed.nik || parsed.n;
        } catch (e) {
          // form-urlencoded may already be parsed by Vercel
          nik = req.body?.nik || req.body?.n;
        }
      } else {
        nik = req.body?.nik || req.body?.n;
      }
    } else {
      return res.status(405).json({
        status: 'error',
        pesan: 'Method not allowed. Use GET or POST.'
      });
    }

    if (!nik) {
      return res.status(400).json({
        status: 'error',
        pesan: 'Parameter "nik" wajib diisi. Contoh: /api/parse?nik=3204110609970001'
      });
    }

    // Normalize: remove non-digits
    nik = String(nik).replace(/\D/g, '');

    if (nik.length !== 16) {
      return res.status(400).json({
        status: 'error',
        pesan: 'NIK harus 16 digit angka.'
      });
    }

    // Wrap callback into Promise
    const result = await new Promise((resolve) => {
      nikParse(nik, (data) => resolve(data));
    });

    // Add meta
    result.meta = {
      timestamp: new Date().toISOString(),
      source: 'nik-parse-vercel',
      version: '2.0.0'
    };

    const statusCode = result.status === 'success' ? 200 : 400;
    return res.status(statusCode).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      pesan: 'Terjadi kesalahan internal server.',
      detail: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
