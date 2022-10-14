from pathlib import Path
import os
import shutil

import re



problem = "²"

# 4 da style
def re_re_re_name_files():
  result = list(Path(".").rglob("*.[pP][nN][gG]"))
  for match in result:
    match = os.path.abspath(str(match.resolve()))
    if problem in match:
      shutil.move(match, match.replace(problem, "2"))


def chonks(list_data, chunk_size):
    chunk_size = max(1, chunk_size)
    return (list_data[i:i+chunk_size] for i in range(0, len(list_data), chunk_size))

def CapiTaliSaTion():
  result = list(Path("./docs").rglob("*.[mM][dD]"))
  for file in result: #chonks(result, int(len(result) / 4)):
    # for file in str(i):
    file = file.resolve()

    with open(file, "r") as f:
      data = f.read()

    data_new = reg(data)
    if data_new:
      with open(file, "w") as f:
        f.write(data_new)
      print(f"changed file content of file: {file}")
          # regex match to link
          # -> if match replace ² -> 2
          # save append line to new_lines

def reg(line):
  pattern = r"!\[.*\]\(\/_images\/.*².*\.png\)"
  matches = re.findall(pattern, line)
  if len(matches) == 0:
    return False

  for match in matches:
    line = line.replace(match, match.replace(problem, "2"))

  return line 
  

if __name__ == '__main__':
  CapiTaliSaTion()
  # lines = "![](/_images/insight2/Logo_Insight².png)\n\n![](/_images/insight2/Logo_Insight².pn) \n\n![](/_images/insight2/Logo_Insight.png)"
  
  # res = reg(lines)

  # print(res)
