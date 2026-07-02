from PIL import Image
from pathlib import Path

# dossier des images
IMAGE_FOLDER = Path("public")

# taille maximale
MAX_WIDTH = 1920
MAX_HEIGHT = 1080

for image_path in IMAGE_FOLDER.rglob("*"):

    # Ignorer les logos
    if "logo" in image_path.name.lower():
        print(f"IGNORÉ : {image_path}")
        continue

    if image_path.suffix.lower() not in [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ]:
        continue

    try:
        with Image.open(image_path) as img:

            img.thumbnail(
                (MAX_WIDTH, MAX_HEIGHT),
                Image.Resampling.LANCZOS
            )

            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            img.save(
                image_path,
                optimize=True,
                quality=85
            )

            print(
                f"OK : {image_path}"
            )

    except Exception as e:
        print(
            f"ERREUR : {image_path}",
            e
        )

print("Terminé")