#Paquetes necesarios:
import pandas as pd
import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver

PATH = "./chromedriver.exe"

driver = webdriver.Chrome(PATH) #Escribe el PATH de geckodriver
driver.get("https://serviciosweb.itam.mx/EDSUP/BWZKSENP.P_Horarios1?s=1809") #Cambia cada periodo
soup=bs(driver.page_source, "html.parser")

# Clave y nombre de las materias
listA=[e.text for e in soup("option")] 

# Extracción claves de mataerias
listB=[e[0:9] for e in listA] 

listE=[]

dataFrame = pd.DataFrame()

#dataFrame = pd.DataFrame(index=range(0,12))

# Modificado para obtener todas las materias
for k in range(0, len(listB)):
    boton=driver.find_element_by_xpath("/html/body/div[3]/form/input[2]")
    materiak=driver.find_element_by_xpath('/html/body/div[3]/form/select/option[{}]'.format(k+1))
    materiak.click()
    
    boton.click()
    
    tablak=pd.read_html(driver.page_source)
    data = tablak[2][:][1:]
    for i in range(len(data)):
        dataFrame = dataFrame.append(data[:][i:i+1], ignore_index=True)
    dataFrame.append(data)
    driver.back()

driver.quit()

writer = pd.ExcelWriter("horarios.xlsx", engine = "xlsxwriter")
dataFrame.to_excel(writer, sheet_name="Materias")

writer.save()
writer.close()
