export default {
  port: process.env.PORT || 3000,
  endpoint: process.env.ENDPOINT || 'http://localhost:3000/',
  salt: 10, // based on bcrypt docs
  accessTokenTtl: 3600000, // 1 hour in milliseconds
  refreshTokenTtl: 1296000000, // 15 days in milliseconds
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB/5WZ2ti1H6Fwo7FgyjwUz
  y0K8TNqQTr63hoi61DdGR9mvY5kvx1qNo7Qup7Hi0gIUGAdH/kM2xrPeyD0aXzhH
  yApq2KPowtdm/lw3pD17aCiC6aMhBtvi88VzYBsWTsOIJQg36d/Tx9nFD34yvcbC
  3gVrgNt3XyEDO6mzrMZAlJmrsdCmkYUiXvsL5wrWATeU0IHAdcUH5PKp1PmYDR4d
  xzN/5Z+6VQTwPvMydw683Ce16GSqxD1CIaREAB0oqSbDatWSvUCmCZDeq9mzIDtg
  GW8Q1VkD/w+OiJrb6Ap8G8gAo6kSh3lOyAhlB4hKQ2MCt0gT1a+5Px7O/jW+IrvV
  AgMBAAE=
  -----END PUBLIC KEY-----`,
  privateKay: `-----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQB/5WZ2ti1H6Fwo7FgyjwUzy0K8TNqQTr63hoi61DdGR9mvY5kv
  x1qNo7Qup7Hi0gIUGAdH/kM2xrPeyD0aXzhHyApq2KPowtdm/lw3pD17aCiC6aMh
  Btvi88VzYBsWTsOIJQg36d/Tx9nFD34yvcbC3gVrgNt3XyEDO6mzrMZAlJmrsdCm
  kYUiXvsL5wrWATeU0IHAdcUH5PKp1PmYDR4dxzN/5Z+6VQTwPvMydw683Ce16GSq
  xD1CIaREAB0oqSbDatWSvUCmCZDeq9mzIDtgGW8Q1VkD/w+OiJrb6Ap8G8gAo6kS
  h3lOyAhlB4hKQ2MCt0gT1a+5Px7O/jW+IrvVAgMBAAECggEARa48Rw02WmkUXQ93
  dgRJ91AUyfatVdYxPlhEAlZAzz+yMEZ5XXils2mvb4PZ/RQiIcR9oxG6mQtlUEmU
  UNv0E9e/JTtnAhe1t915bK9E+AllmP2l7QaJonrh5txDpcG/8lsKwTvgwMevtBee
  0BJpSh4godOQvtbLa7GD4eqOEPyf1pbxSbdgZyORZXSc1fQZSRML+evXPO25R2OM
  TssqVy02bmD+q+TQQ9fVItuTyGUMXVHWHCr5927FMHCHcK2QuF0FamSZcoE9SY7Q
  e+WXBssUDOiABYiWWXSn1i5wQDQDCnrukXWytnkYPbF0rrSUifn4DG8lOv4n2woM
  iyEPeQKBgQC+gAd1ID61C85GnD/64T6Q+AxHscbm4iduiYEUpxU3F9Wh7Lufwxr2
  QWFTeEhDHFVeCgoTc6iqHayiEYw3dIxuI1Po9HkMzf6nEskXb6c/T6PTVtKU4HhY
  omK+EUAqjyCCVjzupzmPCtxazs2SwFKd4RMvxjtRHV8Dd9KxOLCzOwKBgQCr3upw
  212CViy6Kh8COrNtjDsbSuUtRC0AvcvYTk6L/qXqzA1iqC2CYeQ6MyxEYPROXWb1
  9bLA2m6jMLvpBYm7qnHD+G6XOMyq8QJyzeO7+qYGsrVIu/pC/RqneNVmIx/8eWPA
  oBI4IGr2kX8hHWlTgKoAp5o22E5FDzObqBA8LwKBgGCeIKon84XxeepYHx8IFKqE
  E/5czSuWsjce6GfoIhtyLDjXD4YE92zEVi92hvf6q9VpNBkPhRDawg7k5X/Ozdai
  dlFlhOuYorpsDa+kQmga5VUv6Nf3TTJvEbOini+3rd5NDNRh3hCNiptH3f27K2vF
  luyZFsaaJfFlWWfm/7+3AoGAZYkK3WNrCb3ZLJ4HtaxyJeyrWoNTgvt8zqxRydbx
  JllpMZ4c5kTOpfEpAI0MwNS6X7VkRzhAwxgINpZq3M3twZV/IjQZOXNPzkkVljc2
  K+52uQxIdtC+l2apoXiMMYvcsK4SFVE7kjbsmf/4p9qVR8SCKmLZgz8kdj310iZm
  ePcCgYEAi2xIU6isH/1/MCL0221ovcyqESJYfknLd/BHgll3LcMJBt/0yyw5Do1f
  vzLLpuH7NoOW3cz1NXRU9ePKxbfE1ynpwN4/abpMEQjfbtAr+cfSA2ZT3FOjnOv+
  iKa22pRqJmU5EZetGiCxE09ZtxyT6eKXd28Azeq5Ncf3MaWsk2Y=
  -----END RSA PRIVATE KEY-----`,
};
