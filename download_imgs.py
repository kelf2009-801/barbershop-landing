import urllib.request
import os

images = {
    "hero-bg.jpg": "https://dashscope-5859.oss-cn-wulanchabu-acdr-1.aliyuncs.com/7d/4e/20260721/cfc32567/e3ee1359-6765-4f4e-9aaf-89d88c19b9ca1636340070.png?Expires=1785250019&OSSAccessKeyId=LTAI5tKPD3TMqf2Lna1fASuh&Signature=ppr6F5U8jMkxCV2IdFn7SAniCuY%3D",
    "service-haircut.jpg": "https://dashscope-5859.oss-cn-wulanchabu-acdr-1.aliyuncs.com/7d/0e/20260721/a7d7dcad/16f246ac-955b-4d1f-80ca-0ef2ace5ff16316806015.png?Expires=1785250377&OSSAccessKeyId=LTAI5tPxpiCM2hjmWrFXrym1&Signature=IAcE7fTIJgicYJXb%2BeRRZdis%2BuA%3D",
    "service-beard.jpg": "https://dashscope-5859.oss-cn-wulanchabu-acdr-1.aliyuncs.com/7d/0e/20260721/a7d7dcad/16f246ac-955b-4d1f-80ca-0ef2ace5ff16316806015.png?Expires=1785250377&OSSAccessKeyId=LTAI5tPxpiCM2hjmWrFXrym1&Signature=IAcE7fTIJgicYJXb%2BeRRZdis%2BuA%3D"
}

base = "D:/Hermes_Projects/barbershop-landing/img"
for name, url in images.items():
    path = os.path.join(base, name)
    try:
        urllib.request.urlretrieve(url, path)
        size = os.path.getsize(path)
        print(f"OK: {name} ({size} bytes)")
    except Exception as e:
        print(f"FAIL: {name} - {e}")