def treshold_inv(img):

	long = img.shape[0]
	large = img.shape[1]
	for i in range(long):
		for j in range(large):
		
			R = img[i,j][0]
			G = img[i,j][1]
			B = img[i,j][2]

			lum = 0.2126 * R + 0.7152 * G + 0.0722 * B

			if lum < 80:

				img[i,j][0] = 255
				img[i,j][1] = 255
				img[i,j][2] = 255
			
			else:
				img[i,j][0] = 0
				img[i,j][1] = 0
				img[i,j][2] = 0
	return img

def treshold(img):

	long = img.shape[0]
	large = img.shape[1]
	for i in range(long):
		for j in range(large):
		
			R = img[i,j][0]
			G = img[i,j][1]
			B = img[i,j][2]

			lum = 0.2126 * R + 0.7152 * G + 0.0722 * B

			if lum < 180:

				img[i,j][0] = 0
				img[i,j][1] = 0
				img[i,j][2] = 0
			
			else:
				img[i,j][0] = 255
				img[i,j][1] = 255
				img[i,j][2] = 255
	return img

				













def img2text(img):

	import pytesseract as tess
	from PIL import Image
	import cv2

	tess.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'



	img = cv2.imdecode(img,cv2.IMREAD_COLOR)
	img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

	cv2.imwrite("recu.png", img)

	long = img.shape[0]
	large = img.shape[1]

	R = 0
	G = 0
	B = 0


	for i in range(long):
		for j in range(large):
		
			R += img[i,j][0]
			G += img[i,j][1]
			B += img[i,j][2]


	size = long*large
	R /= size
	G /= size
	B /= size

	lum = 0.2126 * R + 0.7152 * G + 0.0722 * B

	if lum < 127:
		
		thresh1 = treshold_inv(img)
		
	else:
		thresh1 = treshold(img)
		
		
	text = tess.image_to_string(thresh1)

	return text