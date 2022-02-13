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
