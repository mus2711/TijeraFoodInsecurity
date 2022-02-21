# Merchant Image

Create the following mutation in the GraphQL playground:

    mutation AddMerchantImage($image: Upload!) {
        addMerchantImage(image: $image)
    }

Then execute the following in the terminal:

`curl localhost:4000/graphql -F operations='{"query":"mutation AddMerchantImage($image: Upload!) {\n addMerchantImage(image: $image)\n}\n\n"}' -F map='{"0": ["variables.image"]}' -F 0=@`**`filename`**

where **filename** is replaced by the path to the file you want to upload.

# Merchant Logo

Create the following mutation in the GraphQL playground:

    mutation AddMerchantLogo($image: Upload!) {
        addMerchantLogo(image: $image)
    }

Then execute the following in the terminal:

`curl localhost:4000/graphql -F operations='{"query":"mutation AddMerchantLogo($image: Upload!) {\n addMerchantLogo(image: $image)\n}\n\n"}' -F map='{"0": ["variables.image"]}' -F 0=@`**`filename`**

where **filename** is replaced by the path to the file you want to upload.

#Food Item Image

Create the following mutation in the GraphQL playground:

    mutation AddFoodImage($image: Upload!, $foodItemId: Int!) {
        addFood(image: $image, foodItemId: $foodItemId)
    }

`curl localhost:4000/graphql -F operations='{"query":"mutation AddFoodImage($image: Upload!, $foodItemId: Int!) {\n addFoodImage(image: $image, foodItemId: $foodItemId)\n}", "variables": {"image": null, "foodItemId": `**`id`**`}}' -F map='{ "0": ["variables.image"] }' -F 0=@`**`filename`**`

where **id** is replaced by the id of the food item you want to add the image for, and **filename** is replaced by the path to the file you want to upload.

# User Image

Create the following mutation in the GraphQL playground:

    mutation AddUserImage($image: Upload!) {
        addUserImage(image: $image)
    }

Then execute the following in the terminal:

`curl localhost:4000/graphql -F operations='{"query":"mutation AddUserImage($image: Upload!) {\n addUserImage(image: $image)\n}\n\n"}' -F map='{"0": ["variables.image"]}' -F 0=@`**`filename`**

where **filename** is replaced by the path to the file you want to upload.
