// 解法二：二分搜尋法（while 迴圈）
function binarySearch1(array, targetElement) {
  // 初始值：0 ~ array 的長度 -1 
  let start = 0
  let end = array.length - 1

  // 終止條件 左邊界 > 右邊界
  while (start <= end) {
    // 中間位置（無條件捨去，取偏左邊那點）
    const middle = start + end >> 1 
    /*
      目標 = 中間那個數字：
      找到數字了，直接回傳位置
      
      目標 > 中間的數字：
      代表前面的數字不用看了，把 start 設為中間位置往右移一位（+1）
      
      目標 < 中間的數字：
      代表後面的數字不用看了，把 end 設為中間位置往左移一位（-1）
    */
    if (targetElement === array[middle]) {
      return middle
    } else if (targetElement > array[middle]) {
      start = middle + 1
    } else {
      end = middle - 1
    }
  }
  // 找不到目標數字，回傳 -1
  return -1
}



// 解法三：二分搜尋法（遞迴）
function binarySearch2(array, targetElement) {
  // 要遞迴的 function 
  function binarySearchRecursively(array, targetElement, start, end) {
    // 左邊界 > 右邊界
    if (start > end) {
      return -1
    }

    // 中間位置（無條件捨去，取偏左邊那點）
    const middle = (start + end) >> 1

    /*
      目標 = 中間那個數字：
      找到數字了，直接回傳位置
      
      目標 > 中間的數字：
      代表前面的數字不用看了，把 start 設為中間位置往右移一位（+1）
      
      目標 < 中間的數字：
      代表後面的數字不用看了，把 end 設為中間位置往左移一位（-1）
    */
    if (targetElement === array[middle]) {
      return middle
    } else if (targetElement > array[middle]) {
      // 更新 start 後，遞迴 binarySearchRecursively
      return binarySearchRecursively(array, targetElement, middle + 1, end)
    } else {
      // 更新 end 後，遞迴 binarySearchRecursively
      return binarySearchRecursively(array, targetElement, start, middle - 1)
    }
  }
  // 第一次呼叫，設定初始值，start = 0, end = array 長度 -1
  return binarySearchRecursively(array, targetElement, 0, array.length-1)
}


// 解法一
console.log('while 迴圈法：')
console.log(binarySearch1([1, 3, 10, 14, 39], 14))
console.log(binarySearch1([1, 3, 10, 14, 39], 299))

// 解法二
console.log('\n遞迴法：')
console.log(binarySearch2([1, 3, 10, 14, 39], 14))
console.log(binarySearch2([1, 3, 10, 14, 39], 299))