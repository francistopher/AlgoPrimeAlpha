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

for i in range(len(nums)):
	minIdx = i
	for j in range(i + 1, len(nums)):
		if nums[minIdx] > nums[j]:
			minIdx = j
	nums[i], nums[minIdx] = nums[minIdx], nums[i]

print("Sorted List")
print(nums)
