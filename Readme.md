```
  kubectl apply -f <file-name?.yml
  kubectl get deployments
  kubectl get pods
  kubectl logs <pod-name>
```

We need to use the images from the docker-hub, so we need to push them to docker hub
docker build -t pawanbisht94/posts .
docker push pawanbisht94/posts


then

kubectl rollout restart deployment <deployment-name>