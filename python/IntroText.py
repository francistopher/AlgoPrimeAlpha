from PySide6 import QtCore, QtWidgets, QtGui
from PySide6.QtGui import QFont

class IntroText(QtWidgets.QLabel):
    
    def __init__(self, text, parent):
        super().__init__(text, parent)
        self.setAlignment(QtCore.Qt.AlignCenter)
        self.stylesheet = ''

    def setTextColor(self, color):
        self.stylesheet += "color: {};\n".format(color)
        self.setStyleSheet(self.stylesheet)

    def setBackgroundColor(self, color):
        self.stylesheet += "background-color: {};\n".format(color)
        self.setStyleSheet(self.stylesheet)

    def reSize(self, width, height):
        self.resize(width, height)

    def reLocate(self, x, y):
        self.move(x, y)

    def setFontSize(self, size):
        self.setFont(QFont("Futura", size))
