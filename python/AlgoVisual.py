import gi
from time import sleep

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk

window = Gtk.Window(title="Visual Algorithm")
window.fullscreen()
window.connect("destroy", Gtk.main_quit)
window.show()
Gtk.main()
