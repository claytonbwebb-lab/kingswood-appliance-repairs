#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

van = Image.open('/home/ubuntu/.openclaw/workspace/kingswood-site/images/dave-van-hero.jpg').convert('RGBA')

# Photo area
photo_w, photo_h = 224, 260

# Crop the van photo - portrait, showing Dave + van
orig_w, orig_h = van.size
crop_ratio = photo_w / photo_h
new_h = int(orig_w / crop_ratio)
top = int(orig_h * 0.08)
van_crop = van.crop((0, top, orig_w, top + new_h))
van_photo = van_crop.resize((photo_w, photo_h), Image.LANCZOS)

# Polaroid: white surround with generous bottom for the text
border_top = 14
border_sides = 14
border_bottom = 58  # space for "Hi, I'm David" text

polaroid_w = photo_w + border_sides * 2
polaroid_h = photo_h + border_top + border_bottom

polaroid = Image.new('RGBA', (polaroid_w, polaroid_h), (255, 255, 255, 255))
polaroid.paste(van_photo, (border_sides, border_top))

# Subtle border on polaroid
draw_p = ImageDraw.Draw(polaroid)
draw_p.rectangle([0, 0, polaroid_w-1, polaroid_h-1], outline=(210, 210, 210, 255), width=1)

# Add "Hi, I'm David" text in the white space below the photo
try:
    font = ImageFont.truetype('/tmp/Pacifico.ttf', 28)
except:
    font = ImageFont.load_default()

text = "Hi, I'm David"
bbox = draw_p.textbbox((0, 0), text, font=font)
text_w = bbox[2] - bbox[0]
text_x = (polaroid_w - text_w) // 2
text_y = photo_h + border_top + (border_bottom - (bbox[3] - bbox[1])) // 2 - 2

draw_p.text((text_x, text_y), text, font=font, fill=(40, 40, 80, 230))

# Save as the same dimensions as original (372x429), polaroid centred
canvas_w, canvas_h = 372, 429
canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
pol_x = (canvas_w - polaroid_w) // 2
pol_y = (canvas_h - polaroid_h) // 2
canvas.paste(polaroid, (pol_x, pol_y), polaroid)

out_path = '/home/ubuntu/.openclaw/workspace/kingswood-site/images/david.png'
canvas.save(out_path, 'PNG')
print(f'Saved {out_path}, canvas={canvas.size}, polaroid={polaroid.size}')
