import unittest
from Backend.src.start import *


class Teststart(unittest.TestCase):

    def test_correct_addition(self):
        self.assertEqual(addnumbers(2,3),5)

if __name__ == '__main__':
    unittest.main()
