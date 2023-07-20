import cv2 as cv

video_file = "/Users/eowkd/OneDrive/Desktop/vi2.mp4" # ������ ���� ��� (���� �߸��ϸ� cvtColor�Լ����� ������)

cap = cv.VideoCapture(video_file) # ������ ĸ�� ��ü ����

if cap.isOpened():                 # ĸ�� ��ü �ʱ�ȭ
    while True:
        ret, img_color = cap.read()      # ���� ������ �б�

        if ret:                     # ������ �б� O
            img_hsv = cv.cvtColor(img_color, cv.COLOR_BGR2HSV)

            hue_blue = 120
            lower_blue = (hue_blue-20, 233, 50)
            upper_blue = (hue_blue+20, 255, 255)

            hue_red = 0
            lower_red = (hue_red-10, 220, 50)
            upper_red = (hue_red+10, 255, 255)

            img_mask1 = cv.inRange(img_hsv, lower_blue, upper_blue)
            img_mask2 = cv.inRange(img_hsv, lower_red, upper_red)


            kernel = cv.getStructuringElement( cv.MORPH_RECT, ( 5, 5 ) )
            img_mask1 = cv.morphologyEx(img_mask1, cv.MORPH_CLOSE, kernel, iterations=3) 
            img_mask2 = cv.morphologyEx(img_mask2, cv.MORPH_CLOSE, kernel, iterations=3) 
            dst_blue = cv.GaussianBlur(img_mask1, (0, 0), 1)
            dst_red = cv.GaussianBlur(img_mask2, (0, 0), 1)

            nlabels, labels, stats, centroids = cv.connectedComponentsWithStats(dst_blue)



            max = -1
            max_index = -1 

            for i in range(nlabels):
 
                if i < 1:
                    continue

                area = stats[i, cv.CC_STAT_AREA]

                if area > max:
                 max = area
                 max_index = i


            if max_index != -1:


              center_x = int(centroids[max_index, 0])
              center_y = int(centroids[max_index, 1]) 
              left = stats[max_index, cv.CC_STAT_LEFT]
              top = stats[max_index, cv.CC_STAT_TOP]
              width = stats[max_index, cv.CC_STAT_WIDTH]
              height = stats[max_index, cv.CC_STAT_HEIGHT]


              cv.rectangle(img_color, (left, top), (left + width, top + height), (0, 0, 255), 5)
              cv.circle(img_color, (center_x, center_y), 10, (0, 255, 0), -1)  





            nlabels, labels, stats, centroids = cv.connectedComponentsWithStats(dst_red)



            max = -1
            max_index = -1 

            for i in range(nlabels):
 
                if i < 1:
                    continue

                area = stats[i, cv.CC_STAT_AREA]

                if area > max:
                 max = area
                 max_index = i


            if max_index != -1:


              center_x = int(centroids[max_index, 0])
              center_y = int(centroids[max_index, 1]) 
              left = stats[max_index, cv.CC_STAT_LEFT]
              top = stats[max_index, cv.CC_STAT_TOP]
              width = stats[max_index, cv.CC_STAT_WIDTH]
              height = stats[max_index, cv.CC_STAT_HEIGHT]


              cv.rectangle(img_color, (left, top), (left + width, top + height), (0, 0, 255), 5)
              cv.circle(img_color, (center_x, center_y), 10, (0, 255, 0), -1)     #���е� ���� ǥ�ø� ��� ��ĥ�� ���� �ڵ尡 �ʹ� ������׿䤾��...

        
            cv.imshow('blue', dst_blue)
            cv.imshow('red', dst_red)
            cv.imshow('VIDEO', img_color)
            cv.waitKey(40)            # ���� �ӵ� ����


cap.release()                      
cv.destroyAllWindows()