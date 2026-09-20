<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Otorisasi Aplikasi - Jaz Academy</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #7367F0;
            --primary-hover: #655bd3;
            --bg-body: #F8F7FA;
            --card-bg: #FFFFFF;
            --text-main: #4B465C;
            --text-muted: #808390;
            --border-color: #DBDADE;
            --danger: #EA5455;
            --success: #28C76F;
            --surface: #F4F5FB;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-body: #1F1B2C;
                --card-bg: #2B263F;
                --text-main: #CFCCE4;
                --text-muted: #8E8A9F;
                --border-color: #433D60;
                --surface: #252037;
            }
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .auth-card {
            background: var(--card-bg);
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid var(--border-color);
            width: 100%;
            max-width: 480px;
            overflow: hidden;
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .card-header {
            padding: 28px 28px 16px 28px;
            text-align: center;
        }

        .brand-logo-container {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .brand-logo {
            width: 36px;
            height: 36px;
        }

        .brand-title {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: var(--text-main);
        }

        .app-connect-preview {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin: 10px 0 16px 0;
        }

        .avatar-app, .avatar-jaz {
            width: 54px;
            height: 54px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--surface);
            border: 1px solid var(--border-color);
            font-weight: 700;
            font-size: 20px;
            color: var(--primary);
        }

        .connect-arrow {
            color: var(--text-muted);
            font-size: 18px;
        }

        .headline {
            font-size: 19px;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 6px;
        }

        .subheadline {
            font-size: 13.5px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        .app-highlight {
            font-weight: 600;
            color: var(--primary);
        }

        .card-body {
            padding: 0 28px 24px 28px;
        }

        .user-pill {
            display: flex;
            align-items: center;
            gap: 12px;
            background: var(--surface);
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 20px;
        }

        .user-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--primary);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 15px;
            overflow: hidden;
            flex-shrink: 0;
        }

        .user-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-info {
            flex-grow: 1;
            min-width: 0;
        }

        .user-name {
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .user-email {
            font-size: 12px;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .scope-section-title {
            font-size: 12.5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
            margin-bottom: 12px;
        }

        .scope-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 24px;
        }

        .scope-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 13.5px;
            line-height: 1.4;
        }

        .scope-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: rgba(40, 199, 111, 0.15);
            color: var(--success);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .actions-group {
            display: flex;
            gap: 12px;
        }

        .btn {
            flex: 1;
            padding: 12px 18px;
            border-radius: 10px;
            font-size: 14.5px;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.2s ease;
            text-align: center;
            text-decoration: none;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        .btn-primary {
            background-color: var(--primary);
            color: #FFFFFF;
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(115, 103, 240, 0.3);
        }

        .btn-primary:hover {
            background-color: var(--primary-hover);
            border-color: var(--primary-hover);
            transform: translateY(-1px);
        }

        .btn-secondary {
            background-color: transparent;
            color: var(--text-muted);
            border-color: var(--border-color);
        }

        .btn-secondary:hover {
            background-color: var(--surface);
            color: var(--text-main);
        }

        .footer-note {
            text-align: center;
            font-size: 11.5px;
            color: var(--text-muted);
            padding: 0 28px 24px 28px;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <div class="auth-card">
        <div class="card-header">
            <div class="brand-logo-container">
                <svg class="brand-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#7367F0"/>
                    <path d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/>
                    <path d="M16 11V21" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M11.5 13.5L16 16L20.5 13.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="brand-title">Jaz Academy</span>
            </div>

            <div class="app-connect-preview">
                <div class="avatar-app" title="{{ $client->name }}">
                    {{ strtoupper(substr($client->name, 0, 2)) }}
                </div>
                <div class="connect-arrow">⇄</div>
                <div class="avatar-jaz" title="Jaz Academy ID">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <path d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z" stroke="#7367F0" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M16 11V21" stroke="#7367F0" stroke-width="2.2" stroke-linecap="round"/>
                        <path d="M11.5 13.5L16 16L20.5 13.5" stroke="#7367F0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>

            <h2 class="headline">Otorisasi Akses</h2>
            <p class="subheadline">
                <span class="app-highlight">{{ $client->name }}</span> ingin menghubungkan dan mengakses akun Jaz Academy Anda.
            </p>
        </div>

        <div class="card-body">
            <!-- User Info Badge -->
            <div class="user-pill">
                <div class="user-avatar">
                    @if($user->image)
                        <img src="{{ Str::startsWith($user->image, 'http') ? $user->image : asset('storage/' . $user->image) }}" alt="{{ $user->name }}">
                    @else
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    @endif
                </div>
                <div class="user-info">
                    <div class="user-name">{{ $user->name }}</div>
                    <div class="user-email">{{ $user->email }}</div>
                </div>
            </div>

            <div style="text-align: right; margin-top: -12px; margin-bottom: 20px;">
                <a href="{{ route('web.logout', ['return_url' => request()->fullUrl()]) }}" style="font-size: 12.5px; color: var(--primary); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                    <span>Bukan Anda? Masuk dengan akun lain</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <div class="scope-section-title">Izin yang diminta:</div>
            <ul class="scope-list">
                @forelse($scopes as $scope)
                    <li class="scope-item">
                        <span class="scope-icon">✓</span>
                        <div>
                            <strong>{{ ucfirst($scope->id) }}</strong>
                            <div style="font-size: 12px; color: var(--text-muted);">{{ $scope->description }}</div>
                        </div>
                    </li>
                @empty
                    <li class="scope-item">
                        <span class="scope-icon">✓</span>
                        <div>
                            <strong>Profil & Akun Dasar</strong>
                            <div style="font-size: 12px; color: var(--text-muted);">Mengakses identitas nama, email, dan peran akun Anda.</div>
                        </div>
                    </li>
                @endforelse
            </ul>

            <div class="actions-group">
                <!-- Deny Form -->
                <form method="post" action="{{ route('passport.authorizations.deny') }}" style="flex: 1;">
                    @csrf
                    @method('DELETE')
                    <input type="hidden" name="state" value="{{ $request->state }}">
                    <input type="hidden" name="client_id" value="{{ $client->id }}">
                    <input type="hidden" name="auth_token" value="{{ $authToken }}">
                    <button type="submit" class="btn btn-secondary" style="width: 100%;">Tolak</button>
                </form>

                <!-- Approve Form -->
                <form method="post" action="{{ route('passport.authorizations.approve') }}" style="flex: 1;">
                    @csrf
                    <input type="hidden" name="state" value="{{ $request->state }}">
                    <input type="hidden" name="client_id" value="{{ $client->id }}">
                    <input type="hidden" name="auth_token" value="{{ $authToken }}">
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Izinkan Akses</button>
                </form>
            </div>
        </div>

        <div class="footer-note">
            Dengan mengizinkan, Anda memberikan hak bagi aplikasi ini untuk menggunakan informasi Anda sesuai Kebijakan Privasi Jaz Academy.
        </div>
    </div>

</body>
</html>
