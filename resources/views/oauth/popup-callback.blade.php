<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jaz Academy SSO - Menyelesaikan Login...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #F8F7FA;
            color: #4B465C;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
        }
        .box {
            background: #fff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            max-width: 360px;
        }
        .spinner {
            width: 36px;
            height: 36px;
            border: 3px solid rgba(115, 103, 240, 0.2);
            border-top-color: #7367F0;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="box">
        <div class="spinner"></div>
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">Menghubungkan Akun...</h3>
        <p style="margin: 0; font-size: 13px; color: #808390;">Jendela ini akan menutup secara otomatis.</p>
    </div>

    <script>
        (function() {
            try {
                const params = new URLSearchParams(window.location.search);
                const code = params.get('code');
                const state = params.get('state');
                const error = params.get('error');
                const errorDescription = params.get('error_description');

                if (window.opener) {
                    if (error) {
                        window.opener.postMessage({
                            type: 'JAZ_SSO_AUTH_ERROR',
                            error: error,
                            errorDescription: errorDescription,
                            state: state
                        }, '*');
                    } else if (code) {
                        window.opener.postMessage({
                            type: 'JAZ_SSO_AUTH_SUCCESS',
                            code: code,
                            state: state
                        }, '*');
                    }
                    setTimeout(function() {
                        window.close();
                    }, 300);
                } else {
                    console.log('No opener window detected.');
                }
            } catch (err) {
                console.error('Popup callback error:', err);
            }
        })();
    </script>
</body>
</html>
