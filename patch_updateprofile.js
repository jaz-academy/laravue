const fs = require('fs');
let code = fs.readFileSync('app/Http/Controllers/Api/Media/UserMediaController.php', 'utf8');

const anchor = "            if ($request->has('name') && $request->filled('name')) $user->name = $request->name;\n            if ($request->has('bio')) $user->bio = $request->bio;";

const newStr = anchor + `
            if ($request->has('banner_image')) $user->banner_image = $request->banner_image;
            if ($request->has('headline')) $user->headline = $request->headline;
            if ($request->has('address_detail')) $user->address_detail = $request->address_detail;
            if ($request->has('phone')) $user->phone = $request->phone;
            if ($request->has('linkedin')) $user->linkedin = $request->linkedin;
            if ($request->has('github')) $user->github = $request->github;
            if ($request->has('website')) $user->website = $request->website;
            
            if ($request->has('education')) {
                $user->education = is_string($request->education) ? $request->education : json_encode($request->education);
            }
            if ($request->has('recommendations')) {
                $user->recommendations = is_string($request->recommendations) ? $request->recommendations : json_encode($request->recommendations);
            }`;

if (code.includes(anchor)) {
    code = code.replace(anchor, newStr);
    fs.writeFileSync('app/Http/Controllers/Api/Media/UserMediaController.php', code);
    console.log('done');
} else {
    console.log('Anchor not found');
}
