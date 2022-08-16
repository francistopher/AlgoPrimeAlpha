import sys
from random import shuffle

print("Sorted List")
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums)
print()

print("Shuffled List")
shuffle(nums)
print(nums)
print()

def outer(i, count):
	if i < count:
		minIdx = i
		minIdx = inner(i + 1, minIdx, len(nums))
		nums[i],nums[minIdx] = nums[minIdx],nums[i]
		outer(i + 1, count)


def inner(j, minIdx, count):
	if j < count:
		if nums[minIdx] > nums[j]:
			minIdx = j
		return inner(j + 1, minIdx, count)
	else:
		return minIdx
	

outer(0, len(nums))

print("Sorted List")
print(nums)

