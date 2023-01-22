function binarySearch(arr, start, end, item) // same time complexity of Ω(logn) // space complexity Ω(1)
{
    var mid = 0;
    while (end > start)
    {
        mid = Math.ceil(start + (end - start) / 2);
        if (arr[mid] == item)
        {
            return mid;
        }
        if (arr[mid] > item)
        {
            start = mid + 1;
        }
        else
        {
            end = mid;
        }
    }
    return -1;
}
var arr = [4, 5, 7, 2, 9, 4, 7];
console.log("1");
var index = binarySearch(arr, 0, arr.length, 9);
console.log(index, arr[index]);

