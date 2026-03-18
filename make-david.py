#!/usr/bin/env python3
"""
Recreate the david.png polaroid-style composite using the new van photo.
Original david.png: 372x429px
Layout: white polaroid frame around the photo, "Hi, I'm David" handwritten text to the right
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Load the new van photo
van = Image.open('/home/ubuntu/.openclaw/workspace/kingswood-site/images/dave-van-hero.jpg').convert('RGBA')

# Target photo area: roughly 200x240 (portrait crop from the van image)
photo_w, photo_h = 200, 240

# The van photo is portrait (747x1600) - crop centre
orig_w, orig_h = van.size
# Crop to a portrait that shows Dave and the van well
# Dave is in the centre of the image, crop from top portion
crop_ratio = photo_w / photo_h
img_ratio = orig_w / orig_h
if img_ratio > crop_ratio:
    # image is wider - crop sides
    new_w = int(orig_h * crop_ratio)
    left = (orig_w - new_w) // 2
    van_crop = van.crop((left, 0, left + new_w, orig_h))
else:
    # image is taller - crop top portion to show Dave prominently
    new_h = int(orig_w / crop_ratio)
    # Dave is in upper-middle area
    top = int(orig_h * 0.1)
    van_crop = van.crop((0, top, orig_w, top + new_h))

van_photo = van_crop.resize((photo_w, photo_h), Image.LANCZOS)

# Polaroid border: white surround
border_top = 12
border_sides = 12
border_bottom = 40  # extra bottom for polaroid look

polaroid_w = photo_w + border_sides * 2
polaroid_h = photo_h + border_top + border_bottom

polaroid = Image.new('RGBA', (polaroid_w, polaroid_h), (255, 255, 255, 255))
polaroid.paste(van_photo, (border_sides, border_top))

# Add slight shadow/border on polaroid
draw_p = ImageDraw.Draw(polaroid)
draw_p.rectangle([0, 0, polaroid_w-1, polaroid_h-1], outline=(200, 200, 200, 255), width=1)

# Now create the full canvas matching original 372x429
canvas_w, canvas_h = 372, 429
canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))

# Place polaroid on left side, vertically centred
pol_x = 0
pol_y = (canvas_h - polaroid_h) // 2
canvas.paste(polaroid, (pol_x, pol_y), polaroid)

# Add "Hi, I'm David" text to the right of the polaroid
draw = ImageDraw.Draw(canvas)

# Try to use a cursive/handwriting-style font, fallback to default
font_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    '/usr/share/fonts/truetype/freefont/FreeSansOblique.ttf',
]
font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            font = ImageFont.truetype(fp, 22)
            break
        except:
            pass
if font is None:
    font = ImageFont.load_default()

# Text position: to the right of polaroid, vertically centred
text_x = polaroid_w + 8
text_y = canvas_h // 2 - 15
# Draw in dark navy/grey to match the original
draw.text((text_x, text_y), "Hi, I'm David", font=font, fill=(40, 40, 80, 220))

# Save
out_path = '/home/ubuntu/.openclaw/workspace/kingswood-site/images/david.png'
canvas.save(out_path, 'PNG')
print(f'Saved: {out_path}, size: {canvas.size}')
