import cv2
import os

extensions = ['avi', 'mp4']
codecs = ['MJPG', 'H264', 'DIVX', 'XVID', 'X264']

for ext in extensions:
    for codec in codecs:
        savepath = "output__%s.%s" % (codec, ext)
        print(savepath)
        try:
            cap = cv2.VideoCapture(0)

            # and our buffer to write frames
            fourcc = cv2.cv.CV_FOURCC(*codec)
            out = cv2.VideoWriter(savepath, fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))), 1)
            i = 0;
            while i < 100:
                i = i + 1

                ret, frame = cap.read()
                if not ret:
                    continue

                text = 'testing 123'
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(frame, text, (50, 50), font, 2, (255, 255, 0), 2)

                # write our frame
                out.write(frame)

                cv2.imshow('My Frame', frame)
                ch = cv2.waitKey(1)
                if ch == 27:  # ESC
                    break

            cap.release()
            out.release()
            cv2.destroyAllWindows()

            os.system("vlc %s" % savepath)

        except Exception as e:
            print("Combo codec=%s, exte=%s failed with: %s" % (codec, ext, str(e)))
