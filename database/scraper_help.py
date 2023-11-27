from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_recipe(url):
    # have selenium chrome driver in same directory 
    driver = webdriver.Chrome()

    try:
        # Open  site
        driver.get(url)
        time.sleep(3)  # Wait for the page to load

        #  recipe name
        recipe_name = driver.find_element(By.ID, "article-heading_1-0").text

        #  ingredients
        ingredients = [ingredient.text for ingredient in driver.find_elements(By.CSS_SELECTOR, "ul.ingredients-section li")]

        #  steps
        steps = [step.text for step in driver.find_elements(By.CSS_SELECTOR, "ul.instructions-section li")]

        #  thumbnail image URL
        # thumbnail_url = driver.find_element(By.CSS_SELECTOR, "div.image-container img").get_attribute("src")

        #  recipe description
        description = driver.find_element(By.XPATH, '//*[@id="article-subheading_1-0"]').text

        #  prep time
        prep_time = driver.find_element(By.CLASS_NAME, "mntl-recipe-details__value").text

        return {
             "name": recipe_name,
            "ingredients": ingredients,
            "steps": steps,
            # "thumbnail_url": thumbnail_url,
            "description": description,
            "prep_time": prep_time
        }

    finally:
        driver.quit()

url = "https://www.allrecipes.com/recipe/83557/juicy-roasted-chicken/"
recipe_data = scrape_recipe(url)
print(recipe_data)
