from PIL import Image, ImageDraw, ImageFont
import sys
# initilaize text
text = 'Not initilaized'
if len(sys.argv) >= 2:
    text = sys.argv[1]

# initilaize file name
file_name = 'Untitled.jpg'
if len(sys.argv) >= 3:
    file_name = sys.argv[2]

# Open image
image = Image.open('./template.jpg')
draw = ImageDraw.Draw(image)

# Select font
font = ImageFont.truetype('Vazir.ttf', 32)
# Write on image
draw.text((598, 151), text, font=font, fill=(0, 0, 0))

# Save image
image.save(file_name)